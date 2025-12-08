import { User, Search, ShoppingCart, Menu } from "lucide-react";

export default function Header() {
	return (
		<header className="bg-white w-full max-w-[414px] mx-auto">
			<div className="w-full" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
				{/* Top Row - Logo and Icons */}
				<div className="flex items-center justify-between" style={{ paddingTop: '13px', paddingBottom: '13px' }}>
					{/* Logo */}
					<h1 
						className="font-montserrat font-bold"
						style={{ 
							color: '#252B42',
							fontSize: '24px',
							lineHeight: '32px',
							letterSpacing: '0.1px',
							textDecoration: 'none'
						}}
					>
						Bandage
					</h1>

					{/* Right Icons */}
					<div className="flex items-center" style={{ gap: '25px' }}>
						<User size={21} style={{ color: '#23A6F0' }} className="cursor-pointer" />
						<Search size={24} style={{ color: '#23A6F0' }} className="cursor-pointer" />
						<ShoppingCart size={24} style={{ color: '#23A6F0' }} className="cursor-pointer" />
						<Menu size={24} style={{ color: '#252B42' }} className="cursor-pointer" />
					</div>
				</div>

				{/* Navigation Menu */}
				<nav className="flex flex-col items-center" style={{ gap: '30px', paddingTop: '48px', paddingBottom: '48px' }}>
					<div
						className="font-montserrat font-normal text-center"
						style={{ 
							color: '#252B42',
							fontSize: '30px',
							lineHeight: '45px',
							letterSpacing: '0.2px'
						}}
					>
						Home
					</div>
					<div
						className="font-montserrat font-normal text-center"
						style={{ 
							color: '#737373',
							fontSize: '30px',
							lineHeight: '45px',
							letterSpacing: '0.2px'
						}}
					>
						Product
					</div>
					<div
						className="font-montserrat font-normal text-center"
						style={{ 
							color: '#737373',
							fontSize: '30px',
							lineHeight: '45px',
							letterSpacing: '0.2px'
						}}
					>
						Pricing
					</div>
					<div
						className="font-montserrat font-normal text-center"
						style={{ 
							color: '#737373',
							fontSize: '30px',
							lineHeight: '45px',
							letterSpacing: '0.2px'
						}}
					>
						Contact
					</div>
				</nav>
			</div>
		</header>
	);
}
