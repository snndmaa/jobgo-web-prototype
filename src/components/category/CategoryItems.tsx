import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import CategoryItemSkeleton from "../skeletons/CategoryItemSkeleton";
import { ICategory } from "../../interfaces";

const dummyCategories: ICategory[] = [
    {
        id: 1,
        name: "Web design",
        slug: "web-design",
        icon: "lni-brush",
        total_jobs: 150
    },
    {
        id: 2,
        name: "Graphic design",
        slug: "graphic-design",
        icon: "lni-heart",
        total_jobs: 80
    },
    {
        id: 3,
        name: "Web development",
        slug: "web-development",
        icon: "lni-funnel",
        total_jobs: 200
    },
    {
        id: 4,
        name: "Human Resource",
        slug: "human-resource",
        icon: "lni-cup",
        total_jobs: 50
    },
    {
        id: 5,
        name: "Support",
        slug: "support",
        icon: "lni-home",
        total_jobs: 30
    },
    {
        id: 6,
        name: "Android Development",
        slug: "android",
        icon: "lni-world",
        total_jobs: 120
    }
];

const CategoryItems = () => {
    const [categories, setCategories] = useState<ICategory[]>(dummyCategories);
    const [loading, setLoading] = useState<boolean>(false); // Set loading to false

    return (
        <section className="category section bg-gray">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Browse Categories</h2>
                    <p>Most popular categories of portal, sorted by popularity</p>
                </div>
                <div className="row">
                    {loading && Array(6).fill(0).map((_, index) => (
                        <CategoryItemSkeleton key={index} />
                    ))}
                    {!loading && categories.map((category, index) => (
                        <CategoryItem category={category} index={index} key={category.id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryItems;
