import Swal from "sweetalert2";

export const toast = async (type, msg) => {
	return Swal.fire({
		title: msg,
		position: 'top-end',
		timer: 2000,
		icon: type,
		toast: true
	})
}