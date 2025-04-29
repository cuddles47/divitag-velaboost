import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    name: string;
    imgUrl: string;
    price: number;
    specs: string[];
    url: string;
    dealPrice?: number;
    staticWidth?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    name,
    imgUrl,
    price,
    specs,
    url,
    dealPrice,
    staticWidth = false,
}) => {
    const hasDiscount = dealPrice !== undefined && dealPrice < price;
    const cardClasses = staticWidth ? 'w-[246px] min-w-[246px]' : 'w-full';

    return (
        <Link href={url} className={`${cardClasses} relative group`}>
            <div className="bg-white rounded-lg p-4 transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full mb-4">
                    <Image
                        src={imgUrl}
                        alt={name}
                        fill
                        className="object-contain"
                    />
                </div>
                <h3 className="font-medium text-lg text-gray-900 mb-2">{name}</h3>
                <div className="flex gap-2 items-center mb-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-red-600 font-bold">${dealPrice.toFixed(2)}</span>
                            <span className="text-gray-400 line-through">${price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="text-gray-900 font-bold">${price.toFixed(2)}</span>
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    {specs.map((spec, idx) => (
                        <p key={idx}>{spec}</p>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
