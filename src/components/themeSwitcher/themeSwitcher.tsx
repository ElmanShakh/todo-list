import "./ThemeSwitcher.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import type { Theme } from "../../types/types";

export function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    const body = document.querySelector("body");
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    function selectTheme() {
      const resolved =
        theme === "system" ? (colorScheme.matches ? "dark" : "light") : theme;
      body?.setAttribute("data-theme", resolved);
    }
    selectTheme();
    if (theme === "system") {
      colorScheme.addEventListener("change", selectTheme);

      return () => {
        colorScheme.removeEventListener("change", selectTheme);
      };
    }
  }, [theme]);

  function changeTheme(color: Theme) {
    setTheme(color);
  }

  return (
    <div className="theme-switcher">
      <button
        className="theme-btn theme-btn_light"
        onClick={() => changeTheme("light")}
        disabled={theme === "light"}
      >
        ☀️
      </button>
      <button
        className="theme-btn theme-btn_dark"
        onClick={() => changeTheme("dark")}
        disabled={theme === "dark"}
      >
        🌙
      </button>
      <button
        className="theme-btn theme-btn_system"
        onClick={() => changeTheme("system")}
        disabled={theme === "system"}
      >
        ⚙️
      </button>
    </div>
  );
}
