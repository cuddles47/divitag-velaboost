import React from 'react';
import Icon from '@/components/UI/Icon';

interface CategoryIconProps {
    iconName: string;
    size?: number;
    className?: string;
}

/**
 * Component hiển thị icon cho các danh mục sản phẩm
 * @param iconName - Tên icon từ PrimeIcons (đã lưu trong CSDL)
 * @param size - Kích thước icon (mặc định: 24px)
 * @param className - CSS classes bổ sung
 */
const CategoryIcon: React.FC<CategoryIconProps> = ({
    iconName,
    size = 22,
    className = ''
}) => {
    // Debug giá trị iconName
    console.log('CategoryIcon received iconName:', iconName);

    // Xử lý các iconUrl từ kho dữ liệu cũ (SVG files)
    // và chuyển đổi sang tên icon PrimeReact tương ứng
    let primeIconName = 'tag'; // Default icon

    if (iconName) {
        // Chuyển đổi tên iconUrl cũ sang tên PrimeIcon
        if (iconName === 'phoneIcon' || iconName === 'pi-mobile') {
            primeIconName = 'mobile';
        } else if (iconName === 'computerIcon' || iconName === 'pi-desktop') {
            primeIconName = 'desktop';
        } else if (iconName === 'tabletIcon' || iconName === 'pi-tablet') {
            primeIconName = 'tablet';
        } else if (iconName === 'watchIcon' || iconName === 'pi-stopwatch') {
            primeIconName = 'stopwatch';
        } else if (iconName === 'otherCatIcon' || iconName === 'pi-ellipsis-h') {
            primeIconName = 'ellipsis-h';
        } else if (iconName === 'pcComponentIcon' || iconName === 'pi-server') {
            primeIconName = 'server';
        } else if (iconName === 'gameIcon' || iconName === 'pi-stop') {
            primeIconName = 'stop';
        } else if (iconName === 'musicIcon' || iconName === 'pi-volume-up') {
            primeIconName = 'volume-up';
        } else if (iconName === 'mouseIcon' || iconName === 'pi-calculator') {
            primeIconName = 'calculator';
        } else if (iconName.startsWith('pi-')) {
            // Nếu đã là tên PrimeIcon, bỏ prefix 'pi-'
            primeIconName = iconName.substring(3);
        }
    }

    // Log tên icon sau khi chuyển đổi
    console.log('Using PrimeIcon:', primeIconName);

    return (
        <Icon
            name={primeIconName}
            size={size}
            className={className}
        />
    );
};

export default CategoryIcon;