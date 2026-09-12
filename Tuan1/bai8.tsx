class Product {
    name: string;
    price: number;

    public constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public filter(listProduct: Array<Product>): Array<Product> {
        return listProduct.filter(item => {
            if (item.price > 100) return item
        })
    }

    public showDetail(pro: Product): void {
        console.log(`${pro.name}, ${pro.price}`)
    }

    public showProduct(listProduct: Array<Product>): void {
        listProduct.forEach(item => (
            this.showDetail(item)
        ))
    }
}

const p1 = new Product("sữa", 120);
const p2 = new Product("mỳ tôm ", 10);
const p3 = new Product("trứng", 50);
const p4 = new Product("RPG-7", 99999);

const listProduct: Product[] = [p1, p2, p3, p4];

const result = p1.filter(listProduct);
p1.showProduct(result)

