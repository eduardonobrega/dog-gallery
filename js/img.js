export class img {
  static async get(breed = 'hound') {
    const endpoint = `https://dog.ceo/api/breed/${breed}/images/random/20`;
    try {
      const response = await fetch(endpoint).then((data) => data.json());
      if(response.status == 'error') throw new Error('')
      console.log()

      return response.message;
    }catch(error) {
      return error
    }

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
