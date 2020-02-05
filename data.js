const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
  createJson() {
    try {
      jsonfile.writeFileSync("projects", [{}])
    } catch (err) {
      console.log(err);
    }
  },

  dataSave(bodyContent) {
    let projects = __dirname + '/data/' + 'projects.json';
    if (fs.existsSync(projects)) {
      this.insertProject(bodyContent);
    } else {
      try {
        this.createJson();
        this.insertProject(bodyContent);
      } catch (err) {
        console.log(err);
      }
    }
  },

  insertProject(bodyContent) {
    let projects = __dirname + '/data/' + 'projects.json';
    let objTotal = this.listProjects().concat(bodyContent);
    try {
      jsonfile.writeFileSync(projects, objTotal, { spaces: 2 })
      console.log('json saved');
      return objTotal;

    } catch (err) {
      console.log(err);
    }

  },

  listProjects() {
    let projects = __dirname + '/data/' + 'projects.json';
    try {
      return jsonfile.readFileSync(projects);
    } catch (err) {
      console.log(err);
    }
  }

};