const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

export class RatingService {
  public static getRating(rating: {[key: string]: number}): number {
    const values = Object.values(rating);

    return values.length > 0 ? average(values) : 0;
  }
}
