import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import menImage from "../assets/resimler/9da5ab42c0357746eb27e42fff6279478e2c8a48.jpg";
import womenImage from "../assets/resimler/b384eba608bd8616723a95d25fce7dcb8f25ba9d.jpg";
import accessoriesImage from "../assets/resimler/5077f785cbfd4a6cf9efad13d9b5d66b1b7cbf4f (1).jpg";
import kidsImage from "../assets/resimler/media bg-cover (1).png";

export default function ShopCards() {
	const categories = useSelector(state => state.product.categories);
	
	// Rating'e göre sırala ve top 5 al
	const top5Categories = [...categories]
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 5);

	return (
		<div className="w-full flex justify-center">
			<section className="w-full bg-[#FAFAFA] flex flex-col items-center py-20 md:max-w-[1440px] md:min-h-[770px] md:rounded-xl md:mx-auto md:justify-center">
				{/* Header */}
				<div className="flex flex-col gap-2 items-center mb-12">
					<h2 className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center md:text-[32px] md:leading-[40px]">TOP CATEGORIES</h2>
					<p className="font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center md:text-[16px] md:leading-[24px]">
						Most rated categories<br className="block md:hidden" /> on our platform
					</p>
				</div>

				{/* Categories Grid */}
				<div className="flex flex-col gap-8 items-center w-full md:grid md:grid-cols-3 md:gap-4 md:w-full md:max-w-[1100px] md:mx-auto md:px-4">
					{top5Categories.map((category, index) => {
					// API'de boş kategorilerin id'lerini doğru id'lerle değiştir
					let categoryId = category.id;
					if (category.id === 9) categoryId = 2;  // 4.6 Ayakkabı → id 2
					if (category.id === 14) categoryId = 1; // 4.3 Tişört → id 1
					
					return (
						<Link
							key={category.id}
						to={`/shop/${category.gender}/${category.title.toLowerCase()}/${categoryId}`}
							className={`relative ${
								index === 0 ? 'w-[324px] h-[500px] md:col-span-1 md:row-span-2' : 'w-[324px] h-[250px] md:w-full md:h-[250px]'
							} rounded overflow-hidden hover:shadow-lg transition`}
						>
							<img 
								src={category.img} 
								alt={category.title} 
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition flex items-end p-6">
								<div className="bg-white px-3 py-1 rounded w-fit mx-auto">
									<div className="flex items-center gap-1">
										<h3 className="font-montserrat font-bold text-[13px] text-[#252B42]">
											{category.title}
										</h3>
										<p className="font-montserrat text-[12px] text-[#F59E0B] font-semibold">
											★ {category.rating.toFixed(1)}
										</p>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
				</div>
			</section>
		</div>
	);
}
