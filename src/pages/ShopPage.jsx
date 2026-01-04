import ShopContainer from "../components/ShopContainer";
import ShopPageCards from "../components/ShopPageCards";
import FilterRow from "../components/FilterRow";
import ShopProductCards from "../components/ShopProductCards";
import MobileClients from "../components/MobileClients";

export default function ShopPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <ShopContainer />      
      <ShopPageCards />
      <FilterRow />
      <ShopProductCards />
      <MobileClients />
      {/* Diğer shop sayfası içerikleri buraya gelecek */}
    </div>
  );
}
