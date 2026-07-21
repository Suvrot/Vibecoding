import { test, expect } from "@playwright/test";

test("homepage loads with hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /войти/i })).toBeVisible();
});

test("login page renders OTP form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByPlaceholder("you@email.com")).toBeVisible();
  await expect(page.getByRole("button", { name: /отправить код/i })).toBeVisible();
});

test("learn page requires auth, redirects to login", async ({ page }) => {
  await page.goto("/learn");
  await expect(page).toHaveURL(/\/login/);
});

test("dashboard requires auth, redirects to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
});

test("projects requires auth, redirects to login", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveURL(/\/login/);
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("nav");
  await expect(nav).toBeVisible();
});
