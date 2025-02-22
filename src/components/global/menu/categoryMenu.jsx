import React, { useEffect } from 'react'
import { 
    Tabs
} from 'antd'
import { useAuth } from '../../../context/AuthContext';

const { TabPane } = Tabs;

export default function CategoryMenu({
    category = [],
    selectedCategory,
    setSelctedCategory,
    sectionRef,
}) {
    const {
        setSize
    } = useAuth()
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; 

            category.forEach(({ key }) => {
                const ref = sectionRef.current[key];
                if (ref) {
                    const { offsetTop, offsetHeight } = ref;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setSelctedCategory(key);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [category]);
    
    const handleTabClick = (key) => {
        setSelctedCategory(key);
        const section = sectionRef.current[key];
        if (section) {
            window.scrollTo({ top: section.offsetTop - 50, behavior: "smooth" });
        }
    };

    return (
        <>
            <Tabs 
                tabPosition='top'
                onTabClick={handleTabClick}
                style={{
                    marginBottom: 30,
                    position: 'sticky',
                    top: setSize(75, 65, 55), 
                    zIndex: 10,
                    backgroundColor: "#FFFFFF"
                }}
            >
                {
                    category.map(value => (
                        <TabPane 
                            tab={
                                <span style={{ fontWeight: selectedCategory === value ? 600 : 400 }}>
                                    {value}
                                </span>
                            } 
                            key={value} 
                            style={{
                                fontWeight: selectedCategory == value ? 600 : 400
                            }}
                        />
                    ))
                }
            </Tabs>
        </>   
    )
}
