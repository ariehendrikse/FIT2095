1.
let query = { airline: 'VA' };
db.collection("flights").find(query).limit(10)
2.
//As it wasn't specified if it was one way or both ways we need to use the in operator. As there are no flights from SYD to SYD then this will retrieve flights that go both ways
let query = { from: { $in: ['SYD', 'SA'] } , to: { $in: ['SYD', 'SA'] }};
let sortBy={cost:-1}
db.collection("flights").find(query).sort(sortBy).toArray(function (err, result) {
});

3.
//As it wasn't specified if it was one way or both ways we need to use the in operator. As there are no flights from SYD to SYD then this will retrieve flights that go both ways. To do this I have specified both SYD and NT  for from and to
let query = { from: { $in: ['SYD', 'NT'] },to: { $in: ['SYD', 'NT'] }};
db.collection("flights").updateMany(query, { $mul: {cost: 3 } }, { upsert: false }, function (err, result) {
});
4.
db.collection("flights").deleteMany({cost: { $lt: 300 }}, function (err, obj) {
});