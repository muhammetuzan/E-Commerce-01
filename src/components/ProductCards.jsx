import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductCards() {
	const products = useSelector(state => state.product.productList);
	const fetchState = useSelector(state => state.product.fetchState);
	
	// Rating'e göre sırala (yüksekten düşüğe) ve ilk 8'i al
	const displayProducts = [...products]
		.sort((a, b) => (b.rating || 0) - (a.rating || 0))
		.slice(0, 8);
	return (
		<section className="w-full h-auto bg-white flex justify-center">
			<div className="w-full flex flex-col items-center px-4 lg:max-w-[1440px] lg:px-0 lg:mx-auto">
				{/* Container */}
				<div className="w-full flex flex-col items-center  pt-20 pb-20 gap-12 lg:w-[1124px] lg:gap-[50px] lg:pt-[80px] lg:pb-[80px]">
					{/* Row 1 - Text Section */}
					<div className="w-[300px] h-[154px] flex items-center justify-center lg:w-[692px] lg:h-[102px] lg:mx-auto">
						<div className="w-[279px] h-[154px] flex flex-col gap-[10px] items-center justify-center lg:w-[692px] lg:h-[102px]">
							<div className="w-[261px] h-[154px] flex flex-col gap-[10px] items-center justify-center lg:w-[692px] lg:h-[102px]">
								<h3 className="font-montserrat w-auto h-[30px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#737373] mx-auto whitespace-nowrap lg:text-[20px] lg:leading-[30px]">Featured Products</h3>
								<h2 className="font-montserrat font-bold w-[239px] h-[64px] text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42] mx-auto lg:w-full lg:h-[40px] lg:text-[32px] lg:leading-[40px]">BESTSELLER PRODUCTS</h2>
								<p className="font-montserrat w-[261px] h-[40px] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-center text-[#737373] lg:w-full lg:h-[32px] lg:text-[16px] lg:leading-[24px]">Problems trying to resolve the conflict between</p>
							</div>
						</div>
					</div>
					{/* Row 2 - Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] lg:w-[1049px] lg:h-auto lg:flex-row lg:gap-[20px]">
						{displayProducts.slice(0, 4).map((product) => (
							<div
								key={product.id}
								className="w-[328px] h-auto mx-auto lg:w-[238px] lg:h-auto"
								style={{ minWidth: '0' }}
							>
								<ProductCard
									image={product.images?.[0]?.url || ''}
									id={product.id}
									title={product.name}
							      	category=""
									price={`$${product.price}`}
									salePrice={product.price > 0 ? `$${(product.price * 0.7).toFixed(2)}` : `$${product.price}`}
									colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
									isFromApi={true}
									categoryId={product.category_id}								isHomePage={true}								/>
							</div>
						))}
					</div>
					{/* Row 3 - More Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] mt-8 lg:w-[1049px] lg:h-auto lg:flex-row lg:gap-[30px] lg:mt-0">
						{displayProducts.slice(4, 8).map((product) => (
							<div
								key={product.id}
								className="w-[328px] h-auto mx-auto lg:w-[238px] lg:h-auto"
								style={{ minWidth: '0' }}
							>
								<ProductCard
									image={product.images?.[0]?.url || ''}
									id={product.id}
									title={product.name}
									category=""
									price={`$${product.price}`}
									salePrice={product.price > 0 ? `$${(product.price * 0.7).toFixed(2)}` : `$${product.price}`}
									colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
									isFromApi={true}
									categoryId={product.category_id}								isHomePage={true}								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
