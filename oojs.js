class Vehicle {
    
    constructor(seat, speed, color, price, refImg) {
        this.seat = seat;
        this.speed = speed;
        this.color = color;
        this.price = price;
        this.refImg = refImg;
    }

    travel(time) {

        document.appendChild();
    }

    createBase() {
        const card = document.createElement("div");
        card.classList.add("card");
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("card-image");
        const img = document.createElement("img");
        const content = document.createElement("div");
        content.classList.add("card-content");
        const h2 = document.createElement("h2");
        h2.classList.add("card-title");

        this.img = img;
        this.content = content;

        img.src = this.refImg;

        card.appendChild(imgDiv);
        imgDiv.appendChild(img);
        card.appendChild(content);
        content.appendChild(h2);

        h2.innerText = this.constructor.name;

        document.body.appendChild(card);
    }

    createDescriptor() {
        const seatP = document.createElement("p");
        const speedP = document.createElement("p");
        const colorP = document.createElement("p");
        const priceP = document.createElement("p");

        seatP.innerText = `Ülések száma: ${this.seat}`;
        speedP.innerText = `Maximális sebesség: ${this.speed} km/h`;
        colorP.innerText = `Szín: ${this.color}`;
        priceP.innerText = `Ár: ${this.price} Ft`;

        this.content.appendChild(seatP);
        this.content.appendChild(speedP);
        this.content.appendChild(colorP);
        this.content.appendChild(priceP);
    }

}

class Car extends Vehicle {
    constructor(seat, speed, color, price, refImg, brand) {
        super(seat, speed, color, price, refImg);
        this.brand = brand;
        this.createBase();
        this.createDescriptor();
    }

    createDescriptor() {
        super.createDescriptor();
        const brandP = document.createElement("p");
        brandP.innerText = `Márka: ${this.brand}`;
        this.content.appendChild(brandP);
    }

}

class Bike extends Vehicle {
    constructor(seat, speed, color, price, refImg, type) {
        super(seat, speed, color, price, refImg);
        this.type = type;
        this.createBase();
        this.createDescriptor();
    }

    createDescriptor() {
        super.createDescriptor();
        const typeP = document.createElement("p");
        typeP.innerText = `Típus: ${this.type}`;
        this.content.appendChild(typeP);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ferrari = new Car(2, 320, "piros", 5000000, "ferrari.png", "Ferrari");
    const lada = new Car(5, 110, "piros", 250000, "lada.png", "Lada");
    const bike = new Bike(1, 30, "kék", 50000, "bike.webp", "mountain bike");
});