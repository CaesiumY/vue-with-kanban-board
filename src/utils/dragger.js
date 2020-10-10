import dragula from "dragula";
import "dragula/dist/dragula.min.css";

const dragger = {
  init(target, options) {
    return dragula(
      [
        ...target // 해당 리스트의 아이템을 드래그 가능하게 만듦
      ],
      options
    );
  },
  setSiblings({ el, target, items, type }) {
    // 계산에 사용할 앞과 뒤의 카드 선언
    let prev = null;
    let next = null;

    items.forEach((item, index, arr) => {
      // 리스트의 아이템들을 순환
      if (item.dataset[type + "Id"] * 1 === el.dataset[type + "Id"] * 1) {
        // 현재 드래그하는 카드일 경우
        prev = index > 0 ? arr[index - 1] : null; // 맨 위가 아닐 경우 이전 아이템 할당
        next = index < arr.length - 1 ? arr[index + 1] : null; // 맨 아래가 아닐 경우 다음 아이템 할당
      }
    });

    return { prev, next };
  }
};

export default dragger;
