export const metadata = {
    title: 'Consult General Physicians Online - Internal Medicine Specialists',
    description: 'Book appointments with top general physicians and internal medicine specialists. Consult online or visit a trusted hospital/clinic near you. Apollo 247 offers experienced doctors for fever, allergies, and more.',
    keywords: 'general physician, internal medicine specialist, doctor consultation online, general practitioner, fever doctor, allergies doctor, diabetes doctor, online doctor consultation',
    alternates: {
        canonical: 'https://www.apollo247.com/home',
    },
    openGraph: {
        title: 'Consult General Physicians Online - Internal Medicine Specialists',
        description: 'Book appointments with top general physicians and internal medicine specialists. Consult online or visit a trusted hospital/clinic near you. Apollo 247 offers experienced doctors for fever, allergies, and more.',
        url: 'https://www.apollo247.com/home',
        siteName: 'Apollo 247',
        images: [
            {
                url: 'https://www.apollo247.com/og-doctors.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Consult General Physicians Online - Internal Medicine Specialists',
        description: 'Book appointments with top general physicians and internal medicine specialists. Consult online or visit a trusted hospital/clinic near you. Apollo 247 offers experienced doctors for fever, allergies, and more.',
        images: ['https://www.apollo247.com/og-doctors.jpg'],
    }
};

export default function DoctorsLayout({ children }) {
    return children;
} 