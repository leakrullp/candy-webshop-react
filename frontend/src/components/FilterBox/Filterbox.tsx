interface FilterBoxProps {
  filters: { countries: string[]; categories: string[] };
  setFilters: React.Dispatch<
    React.SetStateAction<{ countries: string[]; categories: string[] }>
  >;
}

export default function FilterBox({ filters, setFilters }: FilterBoxProps) {
  function resetFilters() {
    setFilters({ countries: [], categories: [] });
  }

  function handleToggle(group: "countries" | "categories", value: string) {
    setFilters((prev) => {
      const current = prev[group];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Denmark"
                  id="checkDenmark"
                  checked={filters.countries.includes("Denmark")}
                  onChange={() => handleToggle("countries", "Denmark")}
                />
                <label className="form-check-label" htmlFor="checkDenmark">
                  Denmark
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Germany"
                  id="checkGermany"
                  checked={filters.countries.includes("Germany")}
                  onChange={() => handleToggle("countries", "Germany")}
                />
                <label className="form-check-label" htmlFor="checkGermany">
                  Germany
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Poland"
                  id="checkPoland"
                  checked={filters.countries.includes("Poland")}
                  onChange={() => handleToggle("countries", "Poland")}
                />
                <label className="form-check-label" htmlFor="checkPoland">
                  Poland
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Greece"
                  id="checkGreece"
                  checked={filters.countries.includes("Greece")}
                  onChange={() => handleToggle("countries", "Greece")}
                />
                <label className="form-check-label" htmlFor="checkGreece">
                  Greece
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Serbia"
                  id="checkSerbia"
                  checked={filters.countries.includes("Serbia")}
                  onChange={() => handleToggle("countries", "Serbia")}
                />
                <label className="form-check-label" htmlFor="checkSerbia">
                  Serbia
                </label>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Categories</label>
            <div id="categoryFilters">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Gummies"
                  id="checkGummies"
                  checked={filters.categories.includes("Gummies")}
                  onChange={() => handleToggle("categories", "Gummies")}
                />
                <label className="form-check-label" htmlFor="checkGummies">
                  Gummies
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Chocolate"
                  id="checkChocolate"
                  checked={filters.categories.includes("Chocolate")}
                  onChange={() => handleToggle("categories", "Chocolate")}
                />
                <label className="form-check-label" htmlFor="checkChocolate">
                  Chocolate
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Licorice"
                  id="checkLicorice"
                  checked={filters.categories.includes("Licorice")}
                  onChange={() => handleToggle("categories", "Licorice")}
                />
                <label className="form-check-label" htmlFor="checkLicorice">
                  Licorice
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Bars and biscuits"
                  id="checkBars"
                  checked={filters.categories.includes("Bars and biscuits")}
                  onChange={() =>
                    handleToggle("categories", "Bars and biscuits")
                  }
                />
                <label className="form-check-label" htmlFor="checkBars">
                  Bars and biscuits
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
