import { Button } from "./ui/button";

type PaginationProp = {
  data: any;
  totalAmount: number;
  handlePageNumber: (pageNumber: string | null | undefined) => void;
};

/**
 * Pagination component
 *
 * @param {PaginationProp} {
  data,
  totalAmount,
  handlePageNumber,
}
 * @returns {*}
 */
const Pagination = ({
  data,
  totalAmount,
  handlePageNumber,
}: PaginationProp): JSX.Element => {
  return (
    <>
      {totalAmount >= 10 ? (
        <div className="flex justify-center gap-5 mt-9">
          <Button
            disabled={data?.previous == null}
            onClick={() => handlePageNumber(data?.previous)}
            type="submit"
            variant={"default"}
          >
            Previous
          </Button>
          <Button
            disabled={data?.next == null}
            onClick={() => handlePageNumber(data?.next)}
            type="submit"
            variant={"default"}
          >
            Next
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
