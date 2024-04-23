import FilterItem from "./FilterItem/FilterItem";
import { BeerType } from "../../../types/types";
import './FiltersList.scss'

type FilteredListProps = {
    beers: BeerType[] | undefined;
    searchTerm: string;
    isHighABV: boolean;
    isClassic: boolean;
    isAcidic: boolean;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
};

const FiltersList = ({
    setCurrentPage,
    currentPage,
    beers,
    searchTerm,
    isHighABV,
    isClassic,
    isAcidic
}: FilteredListProps) => {
    const itemsPerPage = 3;

    // Filter beers based on search term and other criteria
    let filteredBeers = beers || [];
    if (searchTerm) {
        filteredBeers = filteredBeers.filter((beer: BeerType) =>
            beer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (isHighABV) {
        filteredBeers = filteredBeers.filter((beer: BeerType) => beer.abv > 6);
    }
    if (isClassic) {
        filteredBeers = filteredBeers.filter(
            (beer: BeerType) => parseInt(beer.first_brewed.split("/")[1]) < 2010
        );
    }
    if (isAcidic) {
        filteredBeers = filteredBeers.filter((beer: BeerType) => beer.ph < 4);
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredBeers.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };



    return (
        <div className="filter-beers">
            {currentItems.length > 0 ? (
                currentItems.map((filteredBeer) => (
                    <div key={filteredBeer.id}>
                        <FilterItem filteredBeer={filteredBeer} />
                    </div>
                ))
            ) : (
                <p>No beers found.</p>
            )}
            <div className="filter-beers__pagination">
                {Array.from({ length: Math.ceil(filteredBeers.length / itemsPerPage) }, (_, index) => (
                    <button className="filter-beers__pagination-buttons" key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FiltersList;
