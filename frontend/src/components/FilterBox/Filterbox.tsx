import {
  fetchCategories,
  fetchCountries,
} from "../../services/productsService";
import { useEffect, useState } from "react";

interface FilterBoxProps {
  filters: { countries: string[]; categories: string[]; discounted: boolean };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      countries: string[];
      categories: string[];
      discounted: boolean;
    }>
  >;
}
interface FilterCheckInputProps {
  value: string;
  checked: boolean;
  onChange: () => void;
}

function FilterCheckInput({ value, checked, onChange }: FilterCheckInputProps) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={"check" + value}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={"check" + value}>
        {value}
      </label>
    </div>
  );
}

export default function FilterBox({ filters, setFilters }: FilterBoxProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const countriesData: string[] = await fetchCountries();
      setCountries(countriesData);
    };
    const loadCategories = async () => {
      const categoriesData: string[] = await fetchCategories();
      setCategories(categoriesData);
    };

    loadCountries();
    loadCategories();
  }, []);

  function resetFilters() {
    setFilters({ countries: [], categories: [], discounted: false });
  }

  function handleArrayToggle(group: "countries" | "categories", value: string) {
    setFilters((prev) => {
      const current = prev[group];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  }

  function handleDiscountToggle() {
    setFilters((prev) => ({
      ...prev,
      discounted: !prev.discounted,
    }));
  }

  return (
    <>
      <section className="mt-5 p-4 bg-white border rounded shadow-sm">
        <div className="d-flex justify-content-between">
          <h3 className="mb-4">Filters</h3>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Countries</label>
            <div id="countryFilters">
              {countries.map((value) => (
                <FilterCheckInput
                  key={value}
                  value={value}
                  checked={filters.countries.includes(value)}
                  onChange={() => handleArrayToggle("countries", value)}
                />
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Categories</label>
            <div id="categoryFilters">
              {categories.map((value) => (
                <FilterCheckInput
                  key={value}
                  value={value}
                  checked={filters.categories.includes(value)}
                  onChange={() => handleArrayToggle("categories", value)}
                />
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Special Offers</label>
            <div id="discountFilters">
              <FilterCheckInput
                key="Discounted"
                value="Discounted products"
                checked={filters.discounted}
                onChange={handleDiscountToggle}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
