import { Carousel } from '../components/Carousel';

export function Home() {
  return (
    <div>
      <h3 className="font-bold text-3xl text-primary my-3 text-center">
        Shop our latest offerings!
      </h3>
      <Carousel />
    </div>
  );
}
