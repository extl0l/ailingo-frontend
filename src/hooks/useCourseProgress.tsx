// import { useLocalStorage } from "@uidotdev/usehooks";
// import { CourseProgress } from "../types/Course";

// const useCourseProgress = (id: string) => {
// 	const [courseProgress, setCourseProgress] = useLocalStorage<CourseProgress[]>(
// 		"coursesProgress",
// 		[]
// 	);

// 	// const saveToStorage = (course: CourseProgress) => {
// 	//   setCourseProgress(courses => courses.map(savedCourse => savedCourse.id === course.id ? course : savedCourse));
// 	// };

// 	// const addNew = (course: CourseProgress) => {
// 	//   setCourseProgress(courses => [...courses, course]);
// 	// }

// 	// const deleteFromStorage = (id: string) => {
// 	//   setCourseProgress(courses => courses.filter(course => course.id !== id));
// 	// }

// 	const course = courseProgress.find((course) => course.id === id);

//   if(!course) {
//     const newCourse = {
//       id,

//     }
//   }

// };

// export default useCourseProgress;
