export const setIdCourse = (course) => {
  const map = {
    n1: 5,
    N1: 5,
    n2: 4,
    N2: 4,
    n3: 3,
    N3: 3,
    n4: 2,
    N4: 2,
    n5: 1,
    N5: 1,
  };

  return map[course] ?? null; // nếu không có thì trả về null
};
