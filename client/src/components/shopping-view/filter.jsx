import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-5 border-b">
        <h2 className="text-xl font-extrabold text-[#A67C6D]">Bộ lọc</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-xl font-bold text-[#A67C6D]">{keyItem}</h3>
              <div className="grid gap-4 mt-6">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex font-medium items-center gap-2 text-base"
                    key={option.id}
                  >
                    {" "}
                    {/* Thêm key ở đây */}
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
export default ProductFilter;
