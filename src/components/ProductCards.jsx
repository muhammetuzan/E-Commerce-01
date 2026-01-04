import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductCards() {
	const products = useSelector(state => state.product.productList);
	const fetchState = useSelector(state => state.product.fetchState);
	
	// İlk 8 ürünü al
	const displayProducts = products.slice(0, 8);
	return (
		<section className="w-full h-auto bg-white flex justify-center">
			<div className="w-full flex flex-col items-center px-4 md:max-w-[1440px] md:px-0 md:mx-auto">
				{/* Container */}
				<div className="w-full flex flex-col items-center  pt-20 pb-20 gap-12 md:w-[1124px] md:gap-[80px] md:pt-[80px] md:pb-[80px]">
					{/* Row 1 - Text Section */}
					<div className="w-[300px] h-[154px] flex items-center justify-center md:w-[692px] md:h-[102px] md:mx-auto">
						<div className="w-[279px] h-[154px] flex flex-col gap-[10px] items-center justify-center md:w-[692px] md:h-[102px]">
							<div className="w-[261px] h-[154px] flex flex-col gap-[10px] items-center justify-center md:w-[692px] md:h-[102px]">
								<h3 className="font-montserrat w-auto h-[30px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#737373] mx-auto whitespace-nowrap md:text-[20px] md:leading-[30px]">Featured Products</h3>
								<h2 className="font-montserrat font-bold w-[239px] h-[64px] text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42] mx-auto md:w-full md:h-[40px] md:text-[32px] md:leading-[40px]">BESTSELLER PRODUCTS</h2>
								<p className="font-montserrat w-[261px] h-[40px] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-center text-[#737373] md:w-full md:h-[32px] md:text-[16px] md:leading-[24px]">Problems trying to resolve the conflict between</p>
							</div>
						</div>
					</div>
					{/* Row 2 - Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] md:w-[1049px] md:h-[615px] md:flex-row md:gap-[30px]">
						{displayProducts.slice(0, 4).map((product) => (
							<div
								key={product.id}
								className="w-[328px] h-auto mx-auto md:w-[238px] md:h-[615px]"
								style={{ minWidth: '0' }}
							>
								<ProductCard
									image={product.images?.[0]?.url || ''}
									id={product.id}
									title={product.name}
									category={product.description}
									price={`$${product.price}`}
									salePrice={product.price > 0 ? `$${(product.price * 0.7).toFixed(2)}` : `$${product.price}`}
									colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
									isFromApi={true}
									categoryId={product.category_id}
								/>
							</div>
						))}
					</div>
					{/* Row 3 - More Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] mt-8 md:w-[1049px] md:h-[615px] md:flex-row md:gap-[30px] md:mt-0">
						{displayProducts.slice(4, 8).map((product) => (
							<div
								key={product.id}
								className="w-[328px] h-auto mx-auto md:w-[238px] md:h-[615px]"
								style={{ minWidth: '0' }}
							>
								<ProductCard
									image={product.images?.[0]?.url || ''}
									id={product.id}
									title={product.name}
									category={product.description}
									price={`$${product.price}`}
									salePrice={product.price > 0 ? `$${(product.price * 0.7).toFixed(2)}` : `$${product.price}`}
									colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
									isFromApi={true}
									categoryId={product.category_id}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
