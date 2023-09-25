class Directory {
  constructor(name, content) {
    this.id = Math.random();
    this.type = "directory";
    this.name = name;
    this.content = content;
  }
  filterContent(id) {
    this.content = this.content.filter((el) => el.id !== id);
  }
  editTitle(id, title) {
    this.content.forEach((el) => {
      if (el.id === id) {
        el.name = title;
      }
    });
  }
}

export default Directory;
