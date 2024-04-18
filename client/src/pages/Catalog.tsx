import { toDollars } from '../library/to-dollars';
import { Carousel } from '../components/Carousel';
type Shoe = {
  imageUrl: string;
  name: string;
  price: number;
};

const footwear: Shoe[] = [
  {
    imageUrl: '/public/final-project-photos/Adidas - ZX 10000.png',
    name: 'Adidas ZX 10000',
    price: 13999,
  },
  {
    imageUrl: '/public/final-project-photos/Solovair - 8 eye derby.png',
    name: 'Solovair 8 eye derby',
    price: 13999,
  },
  {
    imageUrl: '/public/final-project-photos/Asics - Gel Lyte iii.png',
    name: 'Asics Gel-Lyte III',
    price: 14999,
  },
  {
    imageUrl: '/public/final-project-photos/Jim Green - African Ranger.png',
    name: 'Jim Green African Ranger',
    price: 17999,
  },
  {
    imageUrl: '/public/final-project-photos/Whites - Drifter.png',
    name: 'Whites Drifter',
    price: 64999,
  },
  {
    imageUrl: '/public/final-project-photos/Jordan-1-chicago.png',
    name: 'Nike Air Jordan 1',
    price: 17999,
  },
  {
    imageUrl: '/public/final-project-photos/Reebok - Question.png',
    name: 'Reebok Question',
    price: 14999,
  },
  {
    imageUrl: '/public/final-project-photos/Grant Stone - Diesel Boot.png',
    name: 'Grant Stone Diesel Boot',
    price: 37999,
  },
];

export function Catalog() {
  return (
    <div className="container">
      <h3 className="font-bold text-3xl text-primary my-3 text-center">
        Shop our latest offerings!
      </h3>
      <Carousel />
      <h1 className="font-bold text-5xl text-white my-6">Catalog</h1>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 ">
        {footwear.map((shoe, index) => (
          <div
            key={shoe[index]}
            className="bg-tertiary rounded flex flex-wrap justify-center p-2 shadow-wrapper">
            <img
              className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
              src={shoe.imageUrl}
              alt="Jordan one"
            />
            <h2 className="text-white mr-4">{shoe.name}</h2>
            <h3 className="text-white font-bold">{toDollars(shoe.price)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
