class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
class Profile {
  constructor(birthdate, nationality, region, tel, interests, role) {
    this.birthdate = birthdate;
    this.nationality = nationality;
    this.region = region;
    this.tel = tel;
    this.interests = interests;
    this.role = role;
  }
  setUid(uid) {
    this.uid = uid;
  }
}

module.exports = {
  User: User,
  Profile: Profile,
};
