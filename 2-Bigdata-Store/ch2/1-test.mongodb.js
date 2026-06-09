// 참고.
// 만약 use() 사용 안할 때, 기본은 test이다.
// 그래서, 아래의 조회 명령어 앞에 use() 사용안해도
// 기본으로 test를 사용한다.

use("crudDB");
// 1건 삽입
db.users.insertOne({ name: "Alice", age: 22, place: "부산" });

// 여러 건 한 번에 삽입 (배열로 전달)
db.users.insertMany([
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  {
    name: "이상용",
    age: 25,
    email: "lsy@naver.com",
    hobbies: ["game", "swimming"],
  },
]);

use("crudDB");
db.users.find();

// 전체 조회
use("crudDB");
db.users.findOne({ name: "Alice" }); // 조건에 맞는 첫 문서 1건

// 필드 선택(projection): name, age만 보고 _id는 숨기기
use("crudDB");
db.users.find({}, { name: 1, age: 1, place: 1, _id: 0 });

// 조건 검색: age가 30 이상
use("crudDB");
db.users.find({ age: { $gte: 30 } });

// 한 건 수정: Alice의 age를 26으로
use("crudDB");
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });

// 여러 건 수정: age가 20 이상인 모든 문서에 status 추가
use("crudDB");
db.users.updateMany({ age: { $gte: 20 } }, { $set: { status: "active" } });

// 배열 필드 다루기: hobbies 배열에 추가($push) / 제거($pull)
use("crudDB");
db.users.updateOne({ name: "이상용" }, { $push: { hobbies: "golf" } });

use("crudDB");
db.users.updateOne({ name: "이상용" }, { $pull: { hobbies: "game" } });

use("crudDB");
db.users.deleteOne({ name: "Alice" }); // 한 건 삭제

use("crudDB");
db.users.deleteMany({ age: { $lt: 25 } }); // 조건에 맞는 모든 문서 삭제

// 정렬 + 제한: age 내림차순로 3건
use("crudDB");
db.users.find().sort({ age: -1 }).limit(5);

// 개수 세기: age가 30 이상인 문서 수
use("crudDB");
db.users.countDocuments({ age: { $gte: 30 } });

// 크기 5000바이트로 고정된 컬렉션 생성
use("crudDB");
db.createCollection("logs", { capped: true, size: 5000 });

// 1000건을 넣으면 → 크기 한계를 넘는 오래된 문서부터 자동 삭제됨
use("crudDB");
for (let i = 0; i < 1000; i++) {
  db.logs.insertOne({ x: i });
}
use("crudDB");
db.logs.find(); // 최근 문서만 남아있음

use("crudDB");
db.logs.stats(); // capped 여부·크기 확인
