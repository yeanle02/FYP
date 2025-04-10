import sys
import json
import pickle
import pandas as pd
from catboost import CatBoostRegressor

# Load models
model_home = CatBoostRegressor()
model_home.load_model("model_home.cbm")

model_away = CatBoostRegressor()
model_away.load_model("model_away.cbm")

with open("player_stat_models.pkl", "rb") as f:
    stat_models = pickle.load(f)

with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Get arguments from Node.js
home_team, away_team, round_name, venue, year, maxtemp, mintemp = sys.argv[1:]

year = int(year)
maxtemp = int(maxtemp)
mintemp = int(mintemp)

# Predict team stats
home_team_encoded = label_encoders['hometeam'].transform([home_team])[0]
away_team_encoded = label_encoders['awayteam'].transform([away_team])[0]
round_encoded = label_encoders['round'].transform([round_name])[0]
venue_encoded = label_encoders['venue'].transform([venue])[0]

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

home_score = int(round(model_home.predict(input_full)[0]))
away_score = int(round(model_away.predict(input_full)[0]))

# Return as JSON
result = {
    'home_score': home_score,
    'away_score': away_score
}

print(json.dumps(result))