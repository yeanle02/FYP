import sys
import json
import pickle
import pandas as pd
from catboost import CatBoostRegressor
import os
import traceback


def main():
    try:
        # Parse command line arguments
        home_team = sys.argv[1]
        away_team = sys.argv[2]
        round_name = sys.argv[3]
        venue = sys.argv[4]
        year = int(sys.argv[5])
        maxtemp = float(sys.argv[6])
        mintemp = float(sys.argv[7])
        model_dir = sys.argv[8] if len(sys.argv) > 8 else '.'

        # Define paths to model and metadata files
        model_home_path = os.path.join(model_dir, 'model_home.cbm')
        model_away_path = os.path.join(model_dir, 'model_away.cbm')
        stat_models_path = os.path.join(model_dir, 'player_stat_models.pkl')
        label_encoders_path = os.path.join(model_dir, 'label_encoders.pkl')

        # Check required files
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

        # Encode categorical inputs
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

        # Prepare input features for stat models
        input_metadata = pd.DataFrame({
            'year': [year],
            'round': [round_encoded],
            'hometeam': [home_team_encoded],
            'awayteam': [away_team_encoded],
            'venue': [venue_encoded],
            'maxtemp': [maxtemp],
            'mintemp': [mintemp],
        })

        predicted_stats = {
            stat: model.predict(input_metadata)[0]
            for stat, model in stat_models.items()
        }

        # Prepare final input for match score prediction
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

        # Predict scores with uncertainty
        home_pred = model_home.predict(input_full, prediction_type='RMSEWithUncertainty')
        away_pred = model_away.predict(input_full, prediction_type='RMSEWithUncertainty')

        home_score_mean, home_score_std = home_pred[0]
        away_score_mean, away_score_std = away_pred[0]

        # Estimate confidence percentage (lower std → higher confidence)
        MAX_STD = 3.0  # configurable based on expected uncertainty
        home_confidence_pct = max(0, min(100, 100 - (home_score_std / MAX_STD) * 100))
        away_confidence_pct = max(0, min(100, 100 - (away_score_std / MAX_STD) * 100))
        match_confidence_pct = round(max(home_confidence_pct, away_confidence_pct), 2)

        winning_team = home_team if home_score_mean > away_score_mean else away_team

        result = {
            "home_score": round(home_score_mean),
            "away_score": round(away_score_mean),
            "winning_team": winning_team,
            "match_confidence": match_confidence_pct
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