from torchvision import transforms

pretrained_size = 224
def get_image_transformations(means, stds):
    return {
        "train": transforms.Compose(
            [
                transforms.Resize(pretrained_size),
                transforms.RandomRotation(5),
                transforms.RandomHorizontalFlip(0.5),
                transforms.RandomCrop(pretrained_size, padding=10),
                transforms.ToTensor(),
                transforms.Normalize(mean=means, std=stds),
            ]
        ),
        "valid": transforms.Compose(
            [
                transforms.Resize(pretrained_size),
                transforms.ToTensor(),
                transforms.Normalize(mean=means, std=stds),
            ]
        ),
        "test": transforms.Compose(
            [
                transforms.Resize(pretrained_size),
                transforms.ToTensor(),
                transforms.Normalize(mean=means, std=stds),
            ]
        ),
    }
