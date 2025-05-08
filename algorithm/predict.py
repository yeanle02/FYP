import pandas as pd

# Metadata and player stats columns
metadata_features = ['year', 'round', 'hometeam', 'awayteam', 'venue', 'maxtemp', 'mintemp']

player_stats = ['Disposals', 'Kicks', 'Marks', 'Handballs', 'Goals', 'Behinds', 'HitOuts',
                'Tackles', 'Inside50s', 'Clearances', 'Rebounds', 'Disposals_away', 'Kicks_away',
                'Marks_away', 'Handballs_away', 'Goals_away', 'Behinds_away', 'HitOuts_away',
                'Tackles_away', 'Inside50s_away', 'Clearances_away', 'Rebounds_away']

# Step 1: Predict team-level player stats
def predict_team_stats(home_team_name, away_team_name, round_name, venue_name, year=2024, maxtemp=20, mintemp=10):
    home_team_encoded = label_encoders['hometeam'].transform([home_team_name])[0]
    away_team_encoded = label_encoders['awayteam'].transform([away_team_name])[0]
    round_encoded = label_encoders['round'].transform([round_name])[0]
    venue_encoded = label_encoders['venue'].transform([venue_name])[0]

    input_metadata = pd.DataFrame({
        'year': [year],
        'round': [round_encoded],
        'hometeam': [home_team_encoded],
        'awayteam': [away_team_encoded],
        'venue': [venue_encoded],
        'maxtemp': [maxtemp],
        'mintemp': [mintemp],
    })

    predicted_stats = {}
    for stat, model in stat_models.items():
        predicted_value = model.predict(input_metadata)[0]
        predicted_stats[stat] = predicted_value

    return predicted_stats

# Step 2: Predict final match score
def predict_match(home_team_name, away_team_name, round_name, venue_name, year=2024, maxtemp=20, mintemp=10):
    predicted_stats = predict_team_stats(home_team_name, away_team_name, round_name, venue_name, year, maxtemp, mintemp)

    # Encode inputs
    home_team_encoded = label_encoders['hometeam'].transform([home_team_name])[0]
    away_team_encoded = label_encoders['awayteam'].transform([away_team_name])[0]
    round_encoded = label_encoders['round'].transform([round_name])[0]
    venue_encoded = label_encoders['venue'].transform([venue_name])[0]

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

    # Predict with uncertainty
    home_pred = model_home.predict(input_full, prediction_type='RMSEWithUncertainty')
    away_pred = model_away.predict(input_full, prediction_type='RMSEWithUncertainty')

    home_score_mean, home_score_std = home_pred[0]
    away_score_mean, away_score_std = away_pred[0]

    # Calculate relative confidence
    MAX_STD = 3.0  # adjust based on your highest observed std dev
    home_confidence_pct = max(0, min(100, 100 - (home_score_std / MAX_STD) * 100))
    away_confidence_pct = max(0, min(100, 100 - (away_score_std / MAX_STD) * 100))

    match_confidence_pct = max(home_confidence_pct,away_confidence_pct)

    return {
        "home_score": round(home_score_mean),
        "away_score": round(away_score_mean),
        "match_confidence": match_confidence_pct
    }
