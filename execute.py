import pickle
f = open("./tfidf.pickle",'rb')
model = pickle.load(f)

from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
count_vect = CountVectorizer()
fo = open("some.txt","r")
datas = fo.read lines()
to = open("new_map.pickle","rb")
data = pickle.load(to)
liss=[]
y = []
for k, v in data.items():
	liss.append(k)
	y.append(v)
# data = to.readlines()
# datas=['What is AI?','I am a boy']
X = count_vect.fit_transform(liss)
tfidf_t = TfidfTransformer()
X_train = tfidf_t.fit_transform(X)
clf=MultinomialNB().fit(X_train,y)
y_pred = clf.predict(count_vect.transform(datas))
print(y_pred)