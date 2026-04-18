export default function getUniqueID() {
	return `mitsuki-${Date.now()}-${Math.floor(Math.random() * 9e12 - 1) + 1e12}`;
}
