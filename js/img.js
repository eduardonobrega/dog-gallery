export class img {
  static async get(breed = 'hound') {
    const endpoint = `https://dog.ceo/api/breed/${breed}/images/random/20`;

    const { message } = await fetch(endpoint).then((data) => data.json());

    return message;
  }



  static async download(url) {
    const a = document.createElement("a");
    a.href = await this.toDataURL(url);
    a.download = "my-dog.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }

  static async toDataURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}
