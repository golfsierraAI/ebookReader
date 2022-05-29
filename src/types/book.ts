/**
 * @type
 * @param coverURL 표지 사진 url
 * @param title 제목
 * @param description 설명
 * @param published_date 출판일
 * @param modified_date 수정일
 * @param author 저자
 * @param publisher 발행자
 * @param language 도서 언어
 */
type Book = {
	coverURL: string;
	title: string;
	description: string;
	published_date: string;
	modified_date: string;
	author: string;
	publisher: string;
	language: string;
}

/**
 * @type
 * @param fontFamily 폰트
 * @param fontSize 폰트 크기
 * @param lineHeight 줄 간격
 * @param marginHorizontal 가로 여백
 * @param marginVertical 세로 여백
 */
export type BookStyle = {
	fontFamily: BookFontFamily;
	fontSize: number;
	lineHeight: number;
	marginHorizontal: number;
	marginVertical: number;
}

export type BookFontFamily = 'Origin' | 'Roboto' | 'Montserrat';

export type BookFlow = "paginated" | "scrolled-doc";

export type BookOption = {
	flow: BookFlow,
	resizeOnOrientationChange: boolean,
	spread: "auto" | "none"
}

export default Book