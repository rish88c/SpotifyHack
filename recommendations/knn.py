from sklearn.neighbors import NearestNeighbors
import pandas as pd
import pickle

df_songs = pd.read_csv(r'./data/mergedFile.csv')

"""
Preprocessing
"""
df_features = df_songs.iloc[:, 4:17]
df_features.dropna(inplace=True)

"""
Creation of model
"""
model = NearestNeighbors(n_neighbors=15, metric='cosine')
model.fit(df_features.values)

"""
Dumping the model into a pickle file for further use
"""
filename = r'./model/recommendation_model.pkl'
pickle.dump(model, open(filename, 'wb'))
