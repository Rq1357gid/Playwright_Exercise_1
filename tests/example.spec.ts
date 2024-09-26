import { test, expect } from "@playwright/test";
import path from "path";

test("radio buttons", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/#examples");
  await expect(page).toHaveTitle("Practice Test Automation WebSite");

  await page.getByRole("link", { name: "Radio Button" }).click();
  await expect(page).toHaveTitle(
    "Radio Buttons page for Automation Testing Practice"
  );

  await page.getByLabel("Red").check();

  await page.getByLabel("Football").check();
});

test("drag and drop", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/#examples");
  await expect(page).toHaveTitle("Practice Test Automation WebSite");

  await page.getByRole("link", { name: "Drag and Drop", exact: true }).click();

  await expect(page).toHaveTitle(
    "Drag and Drop page for Automation Testing Practice"
  );
  await page.locator("#column-a").dragTo(page.locator("#column-b"));
});

test("file upload", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/#examples");
  await expect(page).toHaveTitle("Practice Test Automation WebSite");

  await page.getByRole("link", { name: "upload" }).click();
  await expect(page).toHaveTitle(
    "Files Upload page for Automation Testing Practice"
  );

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByTestId("file-input").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    path.join("C:", "Users", "gideo", "Music", "test.txt")
  );

  await page.getByTestId("file-submit").click();
});

test("multiple windows", async ({ page, context }) => {
  await page.goto("https://practice.expandtesting.com/#examples");
  await expect(page).toHaveTitle("Practice Test Automation WebSite");

  await page.getByRole("link", { name: "windows" }).click();
  await expect(page).toHaveTitle(
    "Windows page for Automation Testing Practice"
  );

  const pagePromise = context.waitForEvent("page");
  await page.getByText("Click Here").click();
  const newPage = await pagePromise;

  console.log(await newPage.title());
});
