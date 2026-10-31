import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
var r = {
	root: "_root_alaoa_8",
	icon: "_icon_alaoa_33"
}, i = {
	brand: "brand-small",
	neutral: "neutral-md"
};
function a(a) {
	let { variant: o = "brand", size: s, iconStart: c, iconEnd: l, responsive: u, pending: d, href: f, type: p, className: m, children: h, onClick: g, ..._ } = a, v = o === "brand" || o === "neutral" ? s ?? i[o] : void 0, y = {
		..._,
		className: m ? `${r.root} ${m}` : r.root,
		"data-variant": o,
		"data-size": v,
		"data-responsive": u ? "" : void 0,
		"data-icon-start": c ? "" : void 0
	}, b = /* @__PURE__ */ n(e, { children: [
		c ? /* @__PURE__ */ t("span", {
			className: r.icon,
			"data-slot": "icon-start",
			"aria-hidden": "true",
			children: c
		}) : null,
		h,
		l ? /* @__PURE__ */ t("span", {
			className: r.icon,
			"data-slot": "icon-end",
			"aria-hidden": "true",
			children: l
		}) : null
	] });
	if (f !== void 0) return /* @__PURE__ */ t("a", {
		...y,
		href: f,
		onClick: g,
		children: b
	});
	let x = (e) => {
		d ? e.preventDefault() : g?.(e);
	};
	return /* @__PURE__ */ t("button", {
		...y,
		type: p ?? "button",
		"aria-busy": d || void 0,
		onClick: x,
		children: b
	});
}
export { a as Button };
