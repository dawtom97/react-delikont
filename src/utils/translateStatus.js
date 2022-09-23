export const translateStatus = (value) => {
    switch (value) {
      case "Pending":
        return "Oczekujące";
      default:
        return value;
    }
  };