import { Injectable } from '@angular/core';
import { Product } from './interfaces'; // ✅ import

@Injectable({
  providedIn: 'root'
})
export class Data {

  private shopProducts: Product[] = [
    { name: "Sprite Can", size: '2L', price: 240, img: "../../assets/img/download (4).png" },
    { name: "Fanta", size: '2L', price: 240, img: "../../assets/img/fanta3.png" },
    { name: "Apple Juice", size: '2L', price: 240, img: "../../assets/img/apple juice.png" },
    { name: "Orange juice", size: '2L', price: 240, img: "../../assets/img/ornge juice).png" },
    { name: "Pepsi Can", size: '2L', price: 240, img: "../../assets/img/pepsi.png" },
    { name: "Pepsi Can", size: '2L', price: 240, img: "../../assets/img/fantapurple.png" }
  ];

  private cartProducts: Product[] = [
    { name: "Red Capsicum", price: 120, size: "1kg", subtotal: 0, quantity: 0, img: "../../assets/img/download (6).png" },
    { name: "Chicken Eggs", price: 390, size: "2kg", subtotal: 0, quantity: 0, img: "../../assets/img/eggs pasta.png" },
    { name: "Ginger Slice", price: 470, size: "2kg", subtotal: 0, quantity: 0, img: "../../assets/img/Ginger slices and whole root on a neutral background.png" },
    { name: "Banana", price: 340, size: "2kg", subtotal: 0, quantity: 0, img: "../../assets/img/5 Delicious Low Carb, Low Sugar Fruits You Need To Eat More Of _ Diet vs Disease.png" }
  ];

  private beveragesproducts: Product[] = [
    { name: "Pepsi Can", size: "2kg", price: 490, img: "../../assets/img/pepsi.png" },
    { name: "Lemon Juice", size: "2kg", price: 490, img: "../../assets/img/lemon2.png" },
    { name: "Orange Juice", size: "2kg", price: 490, img: "../../assets/img/ornge juice).png" },
    { name: "AppleJuice", size: "2kg", price: 490, img: "../../assets/img/apple juice.png" },
    { name: "Sprite Can", size: "2kg", price: 490, img: "../../assets/img/download (4).png" },
    { name: "fanta Can", size: "2kg", price: 490, img: "../../assets/img/fanta3.png" }
  ];

  private searchproducts: Product[] = [
    { name: "eggs", size: "2kg", price: 490, img: "../../assets/img/golden eggs).png" },
    { name: "eggs Basket", size: "2kg", price: 490, img: "../../assets/img/eggs pasta.png" },
    { name: "Pasta", size: "2kg", price: 490, img: "../../assets/img/pasta.png" },
    { name: "Noodels", size: "2kg", price: 490, img: "../../assets/img/noodes).png" },
    { name: "Mayonise", size: "2kg", price: 490, img: "../../assets/img/mayonise.png" },
    { name: "Noodles", size: "2kg", price: 490, img: "../../assets/img/blue noodles).png" }
  ];

  private homeProducts: Product[] = [
    { name: "Organic Bananas", size: "2kg", price: 249, img: "../../assets/img/5 Delicious Low Carb, Low Sugar Fruits You Need To Eat More Of _ Diet vs Disease.png" },
    { name: "Red Apple", size: "4kg", price: 459, img: "../../assets/img/The Expert Guide to Healthy Eating.png" },
    { name: "Orange", size: "4kg", price: 359, img: "../../assets/img/Top Foods to Help Lower Cholesterol.png" },
    { name: "Stawberry", size: "4kg", price: 359, img: "../../assets/img/Photo & Image Portfolio by Agriculture Gen Z _ Shutterstock Contributor.png" },
    { name: "Grapes", size: "4kg", price: 450, img: "../../assets/img/grapes.png" },
    { name: "Pomegranate", size: "4kg", price: 450, img: "../../assets/img/Pom colors.png" },
    { name: "Mango", size: "4kg", price: 450, img: "../../assets/img/Background Alphonso Mango, Tropical Fruit, Fresh Mango, Mango Fruit PNG Transparent Image and Clipart for Free Download.png" },
    { name: "PineApple", size: "4kg", price: 450, img: "../../assets/img/Pineapple isolated on white background _ Premium Photo (1).png" },
    { name: "Ginger", size: "4kg", price: 450, img: "../../assets/img/Ginger slices and whole root on a neutral background.png" },
    { name: "Red Capsicum", size: "4kg", price: 450, img: "../../assets/img/download (6).png" },
    { name: "Onion", size: "4kg", price: 450, img: "../../assets/img/Fresh Purple Onions With One Sliced Open Displayed on a Transparent Background.png" },
    { name: "CauliFlower", size: "4kg", price: 450, img: "../../assets/img/download (13).png" },
    { name: "Red Chilli", size: "4kg", price: 450, img: "../../assets/img/vermelho Pimenta pimentas isolado contra uma branco fundo_ criada com generativo ai tecnologia_ (1).png" },
    { name: "Green Chilli", size: "4kg", price: 450, img: "../../assets/img/Green chili vegetable healthy item isolated on transparent background Stock Photo.png" },
    { name: "Red Capsicum", size: "4kg", price: 450, img: "../../assets/img/download (6).png" },
    { name: "Ginger", size: "4kg", price: 450, img: "../../assets/img/Ginger slices and whole root on a neutral background.png" },
    { name: "Beaf", size: "4kg", price: 450, img: "../../assets/img/Fresh Meat, Protein, Food, Grocery PNG Transparent Image and Clipart for Free Download.png" },
    { name: "Boil", size: "4kg", price: 450, img: "../../assets/img/Chicken Boiler 1 Unit.png" },
    { name: "Red Eggs", size: "4kg", price: 450, img: "../../assets/img/golden eggs).png" },
    { name: "Eggs", size: "4kg", price: 450, img: "../../assets/img/golden eggs).png" },
    { name: "Pulses", img: "../../assets/img/pulses.png" },
    { name: "Rice", img: "../../assets/img/download (2).png" },
    { name: "Spices", img: "../../assets/img/spicepng.png" },
    { name: "Oils", img: "../../assets/img/oil.png" },
    { name: "Spices", img: "../../assets/img/spicepng.png" },
    { name: "Oils", img: "../../assets/img/oil.png" }
  ];

  private exploreProducts: Product[] = [
    { name: "Fresh fruits & vegetables", img: "../../assets/img/friuts.png", isChip: true },
    { name: "Cooking Oil & Ghee", img: "../../assets/img/oil.png", isChip: true },
    { name: "Meat & Fish", img: "../../assets/img/Fresh Meat, Protein, Food, Grocery PNG Transparent Image and Clipart for Free Download.png", isChip: true },
    { name: "Bakery & Snacks", img: "../../assets/img/bakery).png", isChip: true },
    { name: "Dairy & Eggs", img: "../../assets/img/eggs.png", isChip: true },
    { name: "Beverages", img: "../../assets/img/drinks).png", isChip: true },
    { name: "See All", img: "", isChip: true },
    { name: "Snacks & Chocolates", img: "../../assets/img/choco.png", category: "Bakery & Snacks", price: 800 },
    { name: "Pop Chips", img: "../../assets/img/pop chips.png", category: "Bakery & Snacks", price: 1600 },
    { name: "Breakfast", img: "../../assets/img/sandwich.png", category: "Dairy & Eggs", price: 400 },
    { name: "Cup Cake", img: "../../assets/img/cupcake.png", category: "Dairy & Eggs", price: 200 },
    { name: "Donuts", img: "../../assets/img/donuts.png", category: "Bakery & Snacks", price: 400 },
    { name: "Eggs", img: "../../assets/img/golden eggs).png", category: "Dairy & Eggs", price: 400 },
    { name: "Snacks", img: "../../assets/img/pringels.png", category: "Bakery & Snacks", price: 200 },
    { name: "Tomato", img: "../../assets/img/tomato.png", category: "Fresh fruits & vegetables", price: 800 },
    { name: "Apples", img: "../../assets/img/The Expert Guide to Healthy Eating.png", category: "Fresh fruits & vegetables", price: 1600 },
    { name: "Orange", img: "../../assets/img/Top Foods to Help Lower Cholesterol.png", category: "Fresh fruits & vegetables", price: 1600 },
    { name: "Green Chili", img: "../../assets/img/Green chili vegetable healthy item isolated on transparent background Stock Photo.png", category: "Fresh fruits & vegetables", price: 800 },
    { name: "Gingers", img: "../../assets/img/Ginger slices and whole root on a neutral background.png", category: "Fresh fruits & vegetables", price: 400 },
    { name: "Original Ghee", img: "../../assets/img/ghee.png", category: "Cooking Oil & Ghee", price: 200 },
    { name: "Pepsi", img: "../../assets/img/pepsi.png", category: "Beverages", price: 200 },
    { name: "Sprite", img: "../../assets/img/download (4).png", category: "Beverages", price: 200 },
    { name: "Careml Cold Coffee", img: "../../assets/img/cofee.png", category: "Dairy & Eggs", price: 1600 },
    { name: "Creamy Cake", img: "../../assets/img/cake.png", category: "Dairy & Eggs", price: 200 },
    { name: "Mayonise", img: "../../assets/img/mayonise.png", category: "Cooking Oil & Ghee", price: 200 },
    { name: "Bread", img: "../../assets/img/bread.png", category: "Dairy & Eggs", price: 200 },
    { name: "Pasta & Noodles", img: "../../assets/img/pasta.png", category: "Bakery & Snacks", price: 1600 },
    { name: "Fried Fish with Lemon", img: "../../assets/img/fish.png", category: "Meat & Fish", price: 800 },
    { name: "Meet Platter", img: "../../assets/img/platter.png", category: "Meat & Fish", price: 800 },
    { name: "Sushi", img: "../../assets/img/sishi.png", category: "Meat & Fish", price: 200 },
    { name: "Amla Oil", img: "../../assets/img/amlao.png", category: "Cooking Oil & Ghee", price: 800 },
    { name: "kbab", img: "../../assets/img/kbab2.png", category: "Meat & Fish", price: 1600 },
    { name: "Potatoes", img: "../../assets/img/potato.png", category: "Fresh fruits & vegetables", price: 400 },
    { name: "Vegetable Oil", img: "../../assets/img/vegeoil.png", category: "Cooking Oil & Ghee", price: 200 },
    { name: "Coca-Cola", img: "../../assets/img/coca cola.png", category: "Beverages", price: 800 },
    { name: "Lemon Drink", img: "../../assets/img/lemon2.png", category: "Beverages", price: 200 },
    { name: "black Coffee", img: "../../assets/img/black coffee.png", category: "Dairy & Eggs", price: 200 },
    { name: "Boiled Eggs", img: "../../assets/img/eggs).png", category: "Dairy & Eggs", price: 200 },
    { name: "pomengrate", img: "../../assets/img/Pom colors.png", category: "Fresh fruits & vegetables", price: 400 },
    { name: "Instant Noodles", img: "../../assets/img/blue noodles).png", category: "Bakery & Snacks", price: 400 },
    { name: "Corn Oil", img: "../../assets/img/corn oil.png", category: "Cooking Oil & Ghee", price: 400 },
    { name: "Banans", img: "../../assets/img/5 Delicious Low Carb, Low Sugar Fruits You Need To Eat More Of _ Diet vs Disease.png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Sunflower Oil", img: "../../assets/img/sunoil.png", category: "Cooking Oil & Ghee", price: 800 },
    { name: "Orange Juice", img: "../../assets/img/ornge juice).png", category: "Beverages", price: 1600 },
    { name: "Noodels", img: "../../assets/img/noodes).png", category: "Bakery & Snacks", price: 400 },
    { name: "Amla", img: "../../assets/img/amlao.png", category: "Fresh fruits & vegetables", price: 400 },
    { name: "Omelette Eggs", img: "../../assets/img/omelte.png", category: "Dairy & Eggs", price: 800 },
    { name: "dates", img: "../../assets/img/dates.png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Fried Eggs", img: "../../assets/img/frid eggs.png", category: "Dairy & Eggs", price: 200 },
    { name: "Potato Chips", img: "../../assets/img/chips.png", category: "Bakery & Snacks", price: 400 },
    { name: "Grapes", img: "../../assets/img/grapes.png", category: "Fresh fruits & vegetables", price: 400 },
    { name: "Red Capsicum", img: "../../assets/img/download (6).png", category: "Fresh fruits & vegetables", price: 800 },
    { name: "PineApple", img: "../../assets/img/Pineapple isolated on white background _ Premium Photo (1).png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Fanta Purple", img: "../../assets/img/fantapurple.png", category: "Beverages", price: 1600 },
    { name: "Eggs", img: "../../assets/img/eggs pasta.png", category: "Dairy & Eggs", price: 1600 },
    { name: "Onions", img: "../../assets/img/Fresh Purple Onions With One Sliced Open Displayed on a Transparent Background.png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Olive Oil", img: "../../assets/img/oliveoil.png", category: "Cooking Oil & Ghee", price: 200 },
    { name: "Apple Juice", img: "../../assets/img/apple juice.png", category: "Beverages", price: 200 },
    { name: "Oranges", img: "../../assets/img/Top Foods to Help Lower Cholesterol.png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Mango", img: "../../assets/img/Background Alphonso Mango, Tropical Fruit, Fresh Mango, Mango Fruit PNG Transparent Image and Clipart for Free Download.png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Red Chili", img: "../../assets/img/vermelho Pimenta pimentas isolado contra uma branco fundo_ criada com generativo ai tecnologia_ (1).png", category: "Fresh fruits & vegetables", price: 200 },
    { name: "Fanta", img: "../../assets/img/fanta3.png", category: "Beverages", price: 200 },
    { name: "Corn Snacks", img: "../../assets/img/barbeta.png", category: "Bakery & Snacks", price: 200 }
  ];

  constructor() {}

  getShopProducts(): Product[] { return this.shopProducts; }
  getCartProducts(): Product[] { return this.cartProducts; }
  getbeveragesproducts(): Product[] { return this.beveragesproducts; }
  getsearchproducts(): Product[] { return this.searchproducts; }
  getHomeProducts(): Product[] { return this.homeProducts; }
  getexploreProducts(): Product[] { return this.exploreProducts; }
}