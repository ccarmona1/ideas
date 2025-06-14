import { formatCreationDate, getCourseDuration } from "../../helpers";

test("formatCreationDate function returns formatted date", () => {
  const date = "2022/01/01";
  const formattedDate = formatCreationDate(date);
  expect(formattedDate).toBe("2022.01.01");
});

test("getCourseDuration function returns formatted duration", () => {
  expect(getCourseDuration(60)).toBe("01:00 hour");
  expect(getCourseDuration(90)).toBe("01:30 hour");
  expect(getCourseDuration(120)).toBe("02:00 hours");
});
