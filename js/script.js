// コーディング規約などによってdata属性が使えない場合があるため、セレクタは定数として保持しておく
const DRAWER_SEL = "[data-drawer]";
const OPEN_SEL = "[data-drawer-trigger]";
const CLOSE_SEL = "[data-drawer-close]";
const CONTAINER_SEL = "[data-drawer-container]";

const OPEN_CLASS = "is-open";
const CLOSE_CLASS = "is-close";

const drawer = document.querySelector(`${DRAWER_SEL}`);
const open = document.querySelector(`${OPEN_SEL}`);
const close = document.querySelector(`${CLOSE_SEL}`);

// 開くボタンをクリックしたとき
open.addEventListener("click", () => {
	openDrawer();
});

// 閉じるボタンをクリックしたとき
close.addEventListener("click", () => {
	closeDrawer();
});

// 背景部分をクリック
drawer.addEventListener("click", (e) => {
	if (!e.target.closest(CONTAINER_SEL)) {
		closeDrawer();
	}
});

// ESCキーを押したとき
drawer.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		// デフォルトでもダイアログが閉じるが、アニメーションさせるためにキャンセルする
		e.preventDefault();

		closeDrawer();
	}
});

// ドロワーを開く関数
function openDrawer() {
	// ドロワー表示前にクラスをつける(開くときのアニメーション開始)
	drawer.classList.add(OPEN_CLASS);

	// ドロワーを開く
	drawer.showModal();

	// ドロワーを開いた後にクラスをはずす
	requestAnimationFrame(() => {
		drawer.classList.remove(OPEN_CLASS);
	});
}

// ドロワーを閉じる関数
function closeDrawer() {
	// ドロワーを閉じる前にクラスをつける(閉じるときのアニメーション開始)
	drawer.classList.add(CLOSE_CLASS);

	// アニメーション終了後にクラスを外してドロワーを閉じる
	// アニメーションが"transition"ではなく"animation"の場合は"animationend"にする
	drawer.addEventListener(
		"transitionend",
		() => {
			drawer.classList.remove(CLOSE_CLASS);
			drawer.close();
		},
		{ once: true }
	);
}
