"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CategoriesQueryResult } from "@/sanity/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CategoryFilterProps {
  categories: CategoriesQueryResult;
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState<
    CategoriesQueryResult[number] | null
  >(null);

  const handleCategorySelect = (
    category: CategoriesQueryResult[number] | null
  ) => {
    setSelectedCategory(category);

    if (category?.slug?.current) {
      router.push(`/category/${category.slug.current}`);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    const matchingCategory = categories.find((cat) => cat._id === categoryId);

    if (matchingCategory) {
      if (selectedCategory?._id === categoryId) {
        handleCategorySelect(null);
      } else {
        handleCategorySelect(matchingCategory);
      }
    }
  };

  const handleSelectAll = () => {
    handleCategorySelect(null);
  };

  const buttonText = selectedCategory
    ? selectedCategory?.title
    : "filter categories";

  // Filter out categories without slugs
  const validCategories = categories.filter(
    (category) => category.slug?.current
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-48 justify-between">
            {buttonText}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={selectedCategory === null}
            onCheckedChange={handleSelectAll}
          >
            All Categories
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {validCategories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category._id}
              checked={selectedCategory?._id === category._id}
              onCheckedChange={() => handleCategoryToggle(category._id)}
            >
              {category.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryFilter;
