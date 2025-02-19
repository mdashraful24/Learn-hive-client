import { useThemeContext } from "../../../providers/ThemeProvider";

export function DashboardDark() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div>
            <div>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                        className="toggle-checkbox hidden"
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600">
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`}></div>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default DashboardDark;
