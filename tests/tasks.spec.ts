import { test, expect, Page } from "@playwright/test";

async function addTask(page: Page, name: string) {
  await page.getByRole("textbox").fill(name);
  await page.getByRole("button", { name: "Add task" }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Adds a task to the list and saves it", async ({ page }) => {
  await addTask(page, "Test Task");
  await expect(page.getByTestId("task-item")).toContainText("Test Task");
  // reload and save task
  await page.reload();
  await expect(page.getByTestId("task-item")).toContainText("Test Task");
});

test("Completing the task", async ({ page }) => {
  await addTask(page, "Test Task");
  const taskCheckbox = page.getByRole("checkbox", {
    name: "Complete task Test Task",
  });
  // checkbox is not checked when task is added
  await expect(taskCheckbox).not.toBeChecked();

  //completing the task
  await taskCheckbox.click();
  await expect(taskCheckbox).toBeChecked();
});

test("Editing the task", async ({ page }) => {
  await addTask(page, "Test Task");
  await page
    .getByTestId("task-item")
    .getByRole("button", { name: "Edit" })
    .click();
  await page.locator("input.task-item_edit").fill("Edited task");
  // submitting the edit
  await page
    .getByTestId("task-item")
    .getByRole("button", { name: "Submit" })
    .click();
  await expect(page.getByTestId("task-item")).toContainText("Edited task");
  // canceling the edit
  await page
    .getByTestId("task-item")
    .getByRole("button", { name: "Edit" })
    .click();
  await page
    .locator("input.task-item_edit")
    .fill("This edit will not be saved");
  await page
    .getByTestId("task-item")
    .getByRole("button", { name: "Cancel edit" })
    .click();
  await expect(page.getByTestId("task-item")).toContainText("Edited task");
});

test("Deleting the task", async ({ page }) => {
  await addTask(page, "Test Task");
  await page
    .getByTestId("task-item")
    .getByRole("button", { name: "Delete" })
    .click();
  await expect(page.getByTestId("task-item")).toHaveCount(0)
});

test("Switching theme", async ({ page }) => {
  const body = page.locator("body");
  const lightBtn = page.locator(".theme-btn_light");
  const darkBtn = page.locator(".theme-btn_dark");

  await darkBtn.click();
  await expect(body).toHaveAttribute("data-theme", "dark");

  await lightBtn.click();
  await expect(body).toHaveAttribute("data-theme", "light");
});
