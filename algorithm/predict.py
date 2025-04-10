import sys
import json
import pickle
import pandas as pd
from catboost import CatBoostRegressor
import os
import traceback

def main():
    try:

        home_team = sys.argv[1]
        away_team = sys.argv[2]
        round_name = sys.argv[3]
        venue = sys.argv[4]
        year = int(sys.argv[5])
        maxtemp = float(sys.argv[6])
        mintemp = float(sys.argv[7])
        

        model_dir = sys.argv[8] if len(sys.argv) > 8 else '.'
        
        

        model_home_path = os.path.join(model_dir, 'model_home.cbm')
        model_away_path = os.path.join(model_dir, 'model_away.cbm')
        stat_models_path = os.path.join(model_dir, 'player_stat_models.pkl')
        label_encoders_path = os.path.join(model_dir, 'label_encoders.pkl')
        
 

        required_files = {
            "Home model": model_home_path,
            "Away model": model_away_path,
            "Player stat models": stat_models_path,
            "Label encoders": label_encoders_path
        }
        
        for name, path in required_files.items():
            if not os.path.exists(path):
                print(f"{name} file not found at: {path}", file=sys.stderr)
                return json.dumps({
                    "error": f"{name} file not found at: {path}",
                    "home_score": 0,
                    "away_score": 0,
                    "winning_team": "Error",
                    "confidence": 0
                })
        
        # Load models
        model_home = CatBoostRegressor()
        model_home.load_model(model_home_path)
        
        model_away = CatBoostRegressor()
        model_away.load_model(model_away_path)
        

        with open(stat_models_path, "rb") as f:
            stat_models = pickle.load(f)
        
        with open(label_encoders_path, "rb") as f:
            label_encoders = pickle.load(f)

        try:
            home_team_encoded = label_encoders['hometeam'].transform([home_team])[0]
            away_team_encoded = label_encoders['awayteam'].transform([away_team])[0]
            round_encoded = label_encoders['round'].transform([round_name])[0]
            venue_encoded = label_encoders['venue'].transform([venue])[0]
        except KeyError as e:
            print(f"Label encoder error: {e}", file=sys.stderr)
            return json.dumps({
                "error": f"Invalid input value for {e}",
                "home_score": 0,
                "away_score": 0,
                "winning_team": "Error",
                "confidence": 0
            })
        except ValueError as e:
            print(f"Encoding error: {e}", file=sys.stderr)
            return json.dumps({
                "error": f"Encoding error: {e}",
                "home_score": 0,
                "away_score": 0,
                "winning_team": "Error",
                "confidence": 0
            })
     
        input_metadata = pd.DataFrame({
            'year': [year],
            'round': [round_encoded],
            'hometeam': [home_team_encoded],
            'awayteam': [away_team_encoded],
            'venue': [venue_encoded],
            'maxtemp': [maxtemp],
            'mintemp': [mintemp],
        })
        

        predicted_stats = {stat: model.predict(input_metadata)[0] for stat, model in stat_models.items()}

        # Prepare final input
        input_full = pd.DataFrame({
            'year': [year],
            'round': [round_encoded],
            'hometeam': [home_team_encoded],
            'awayteam': [away_team_encoded],
            'venue': [venue_encoded],
            'maxtemp': [maxtemp],
            'mintemp': [mintemp],
            **{k: [v] for k, v in predicted_stats.items()}
        })
        

        home_score = float(model_home.predict(input_full)[0])
        away_score = float(model_away.predict(input_full)[0])
        

        winning_team = home_team if home_score > away_score else away_team

        result = {
            "home_score": round(home_score),
            "away_score": round(away_score),
            "winning_team": winning_team

        }
        
        return json.dumps(result)
        
    except Exception as e:
        traceback.print_exc(file=sys.stderr)
        return json.dumps({
            "error": str(e),
            "home_score": 0,
            "away_score": 0,
            "winning_team": "Error",
            "confidence": 0
        })

if __name__ == "__main__":
    result_json = main()
    print(result_json)  