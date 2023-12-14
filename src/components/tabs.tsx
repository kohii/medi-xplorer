import { twMerge } from "tailwind-merge";

export type TabsProps<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  tabs: {
    value: T;
    label: string;
    disabled?: boolean;
  }[];
};

export function Tabs<T extends string = string>({
  value,
  onChange,
  tabs,
}: TabsProps<T>) {
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.value}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(tab.value);
                }}
                className={twMerge(
                  "inline-block px-6 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300",
                  value === tab.value ? "text-blue-600 border-blue-600 active" : "",
                  tab.disabled ? "cursor-not-allowed text-gray-400" : "",
                )}>
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
