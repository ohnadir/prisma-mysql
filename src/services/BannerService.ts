import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { Prisma } from "@prisma/client";
import { BannerRepository } from "../repositories/BannerRepository";
import unlinkFile from "../utils/unlinkFile";

export class BannerService {
    private bannerRepository: BannerRepository;

    constructor() {
        this.bannerRepository = new BannerRepository();
    }

    async createToDB(data: Prisma.BannerCreateInput) {

        const banner = await this.bannerRepository.create(data);
        if (!banner) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create banner");
        }
        return banner;
    }

    async retrieveFromDB() {
        const banners = await this.bannerRepository.retrieve();
        return banners;
    }

    async updateToDB(id: string, data: Prisma.BannerUpdateInput) {

        // check if banner exists
        const isExistBanner = await this.bannerRepository.findById(id);
        if (!isExistBanner) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
        }

        // if image is being updated, delete the old image file
        if(data.image){
            unlinkFile(isExistBanner.image);
        }

        // proceed to update
        const updatedBanner = await this.bannerRepository.updateById(id, data);
        if (!updatedBanner) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update banner");
        }
        return updatedBanner;
    }

    async deleteFromDB(id: string) {

        // check if banner exists
        const isExistBanner = await this.bannerRepository.findById(id);
        if (!isExistBanner) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
        }

        // delete the old image file
        unlinkFile(isExistBanner.image);

        const banner = await this.bannerRepository.delete(id);
        if (!banner) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
        }
        return banner;
    }
}
