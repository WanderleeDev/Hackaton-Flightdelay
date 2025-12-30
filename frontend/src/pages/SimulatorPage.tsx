import SideTools from "../components/composed/Sidetools";

export default function SimulatorPage() {
  return (
    <div className="relative min-h-dvh">
      <img
        alt="Dark stylized world map showing continents from space with city lights"
        className="aspect-video h-full w-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1XhFFecGxm3nAQ1-4IBKoUyhPWyyyv3TzByle8RzebO2JqEugbVGXHI8OC4uTZYZ8C3gUBorbuL2CX9T7kKmdnM38RiLy_8lGfSd2FSE9Eb7kk7GdNIDKsdAf3VPJclTagzBPnXsARwgYPNyiOz0wDAEq_i_6xdCLCjF7HK23X7K6Fd2zEKfA1ib09xRQhmwrYzQujeA2hSm27jD73IdgHLUtji8iMVuCKiFKE2-lb8Jc5pNqK7mGUdkpzPjx7_41azN8H3gpn80"
      />
      <div className="pointer-events-none absolute inset-0 z-10">
        <SideTools />
      </div>
    </div>
  );
}
